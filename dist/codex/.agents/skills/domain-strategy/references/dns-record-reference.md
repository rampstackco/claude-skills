# DNS Record Reference

A quick reference to the DNS records every domain operator should understand. Stack-agnostic. The syntax is the same across DNS providers.

---

## Address records

### A record

Maps a name to an IPv4 address.

```
example.com.        300    IN    A       192.0.2.1
www.example.com.    300    IN    A       192.0.2.1
```

Use for the apex and any subdomain that resolves to a specific IPv4.

### AAAA record

Maps a name to an IPv6 address.

```
example.com.        300    IN    AAAA    2001:db8::1
```

If your infrastructure supports IPv6, set AAAA records alongside A records. Many ISPs prefer IPv6.

### CNAME record

Maps a name to another name (which must resolve to A or AAAA).

```
www.example.com.    300    IN    CNAME   example.com.
shop.example.com.   300    IN    CNAME   shopify-store.myshopify.com.
```

CNAME cannot be used at the apex (e.g., `example.com.` cannot be a CNAME). Most providers offer ALIAS or ANAME records as a workaround for apex.

CNAME at a name conflicts with any other record at the same name. You can't have both a CNAME and an MX at the same name, for example.

---

## Mail records

### MX record

Specifies mail servers for the domain. Priority is the first number; lower wins.

```
example.com.    300    IN    MX    10 mx1.mailprovider.com.
example.com.    300    IN    MX    20 mx2.mailprovider.com.
```

Even if the domain doesn't send or receive email, set a "null MX" to prevent spoofing:

```
example.com.    300    IN    MX    0 .
```

This is the "this domain doesn't accept mail" signal, defined in RFC 7505.

### TXT record (for SPF, DKIM, DMARC)

TXT records hold arbitrary text. The most common use is email authentication.

**SPF (Sender Policy Framework):** declares which servers can send mail for the domain.

```
example.com.    300    IN    TXT    "v=spf1 include:_spf.mailprovider.com -all"
```

Only one SPF record per domain. Multiple SPF records break SPF entirely.

**DKIM (DomainKeys Identified Mail):** publishes the public key for signing outgoing email.

```
selector1._domainkey.example.com.    300    IN    TXT    "v=DKIM1; k=rsa; p=MIGfMA0G..."
```

The selector is set by your mail provider. Different providers use different selectors.

**DMARC (Domain-based Message Authentication):** tells receivers what to do with mail that fails SPF or DKIM.

```
_dmarc.example.com.    300    IN    TXT    "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"
```

Start with `p=none` for monitoring, then move to `p=quarantine` and finally `p=reject` once aligned. See `email-deliverability` skill for the full progression.

---

## Security records

### CAA record

Certificate Authority Authorization. Restricts which CAs can issue certificates for the domain.

```
example.com.    300    IN    CAA    0 issue "letsencrypt.org"
example.com.    300    IN    CAA    0 issuewild "letsencrypt.org"
example.com.    300    IN    CAA    0 iodef "mailto:security@example.com"
```

Without CAA, any public CA can issue a cert for your domain. With CAA, only the listed CAs can. Add CAA for any domain you care about.

The `iodef` directive specifies where to email reports of unauthorized issuance attempts.

### TLSA record

Used with DNSSEC for DANE (DNS-based Authentication of Named Entities). Pins the TLS certificate or public key in DNS.

```
_443._tcp.example.com.    300    IN    TLSA    3 1 1 abc123def456...
```

Niche. Most operators won't need TLSA. Useful for high-security applications.

### DNSKEY, DS, RRSIG (DNSSEC)

DNSSEC signs DNS responses cryptographically, preventing spoofing. Setup is provider-specific. Most modern DNS providers offer one-click DNSSEC. Enable it if available.

---

## Service discovery

### SRV record

Specifies the location of services (priority, weight, port, target).

```
_sip._tcp.example.com.    300    IN    SRV    10 60 5060 sip-server.example.com.
```

Used for SIP, XMPP, and similar. Most websites don't need SRV records.

### NS record

Specifies authoritative name servers for the domain (or a delegated subdomain).

```
example.com.    300    IN    NS    ns1.dns-provider.com.
example.com.    300    IN    NS    ns2.dns-provider.com.
```

NS records are usually managed by the registrar (for the apex) or by you (for delegated subdomains).

### SOA record

Start of Authority. Contains administrative info about the zone.

```
example.com.    300    IN    SOA    ns1.dns-provider.com. admin.example.com. 2024010101 7200 3600 1209600 300
```

Auto-managed by most DNS providers. The serial number (2024010101) increments on every zone change.

---

## TTL guidance

TTL is how long a record can be cached by resolvers, in seconds.

| Record type | Recommended TTL | Reason |
|---|---|---|
| A, AAAA on stable infrastructure | 3600 (1 hour) to 86400 (1 day) | Reduces lookup load |
| A, AAAA during a migration | 300 (5 min) | Fast cutover |
| CNAME | 3600 to 86400 | Stable mappings |
| MX | 86400 (1 day) | Mail rarely changes |
| TXT (SPF, DMARC) | 3600 | Quick to update if needed |
| CAA | 86400 | Rarely changes |

Lower TTL during migrations. Raise it back after.

---

## Common record patterns

### A new website, single domain

```
example.com.            3600    IN    A        192.0.2.1
example.com.            3600    IN    AAAA     2001:db8::1
www.example.com.        3600    IN    CNAME    example.com.
example.com.            3600    IN    MX       10 mx.mailprovider.com.
example.com.            3600    IN    TXT      "v=spf1 include:_spf.mailprovider.com -all"
_dmarc.example.com.     3600    IN    TXT      "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"
example.com.            86400   IN    CAA      0 issue "letsencrypt.org"
example.com.            86400   IN    CAA      0 iodef "mailto:security@example.com"
```

### A domain that doesn't send mail

Same as above but replace MX records with the null MX:

```
example.com.    86400   IN    MX    0 .
```

And the SPF can be:

```
example.com.    3600    IN    TXT    "v=spf1 -all"
```

### A redirect-only domain

For a parked or alias domain that only redirects to a primary:

```
parked-example.com.            3600    IN    A     192.0.2.10
parked-example.com.            86400   IN    MX    0 .
parked-example.com.            3600    IN    TXT   "v=spf1 -all"
parked-example.com.            86400   IN    CAA   0 issue "letsencrypt.org"
```

The A record points to whatever serves the redirect. The null MX and SPF prevent the domain from being used for email spoofing.

---

## Common mistakes

**Multiple SPF records.** Only one SPF record per domain is allowed. Two or more break SPF entirely. To "include" multiple senders, combine them in a single `v=spf1` record.

**CNAME at the apex.** Forbidden by the DNS spec. Use ALIAS or ANAME (provider-specific) or just use an A record.

**TTL too low long-term.** Sub-300 TTLs cause unnecessary DNS query load. Use low TTLs only during migrations.

**Forgotten CAA record after switching CAs.** If you switch from Let's Encrypt to another CA but the CAA record only lists Let's Encrypt, the new CA can't issue. Update CAA before issuing.

**No null MX on non-mail domains.** Domain becomes a target for spoofing. Cheap to add the null MX.

**Manual records that should be provider-managed.** Many providers manage records for their services automatically (e.g., Vercel, Cloudflare). Manual records can drift and conflict.

---

## Tooling

For testing DNS:
- `dig` (command line, the standard)
- `nslookup` (older but widespread)
- Online tools: dnschecker.org, mxtoolbox.com, intodns.com (good for sanity-checking a fresh setup)

For testing email auth specifically:
- mail-tester.com
- dmarcian.com
- mxtoolbox.com (deliverability tab)

For monitoring DNS in production:
- Most monitoring services include DNS checks (uptime providers, observability platforms)
- See `monitoring-and-alerting` skill for setting these up.
