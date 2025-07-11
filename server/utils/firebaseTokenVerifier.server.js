import jwt from 'jsonwebtoken'

const publicKeys = JSON.parse('{\n' +
    '  "a8df62d3a0a44e3dfcdcafc6da138377459f9b01": "-----BEGIN CERTIFICATE-----\\nMIIDHTCCAgWgAwIBAgIJAINiGfe+RjEEMA0GCSqGSIb3DQEBBQUAMDExLzAtBgNV\\nBAMMJnNlY3VyZXRva2VuLnN5c3RlbS5nc2VydmljZWFjY291bnQuY29tMB4XDTI1\\nMDcwODIwMzcxNVoXDTI1MDcyNTA4NTIxNVowMTEvMC0GA1UEAwwmc2VjdXJldG9r\\nZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqGSIb3DQEBAQUA\\nA4IBDwAwggEKAoIBAQDJtxXBGgjCIIfzwWugAN/gZd6s/p42c2I4IgrZddnxTD0w\\nPIUUR0EQhZLjpVtTWbYiQLElghmNBrmO1REWHBpVXCma3kndnCmHBGbzzZ0n2Xnc\\n3gbKwNuaAaHBMnWLYxNYe5N+tCCkENJ5sYeuBpvh0z0ZwXFgEf0c45sBY0xoY0tY\\noUngvx5jCmxztx5JPM24DvCTdK3/4H8M0Rt4baYQg8xB2XU5M+hEDcWzeguiuQo+\\n27wb16fjPi7C5Mt+Bd+hXzBQ1oX8WR/uzJ2ZzKXgo9IpFZadl7XxbI+BxwRAP5WG\\n70QxIz/iHGYJu+vGfmbq3rdnaG0sNAwiC7LLVHJjAgMBAAGjODA2MAwGA1UdEwEB\\n/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMCMA0G\\nCSqGSIb3DQEBBQUAA4IBAQCbjXhzcXcLuiFNG7vrKjesOgMXBrzSDLjEa60kJvt8\\n1h5a2JV8eT5jDXVrT92n4jT1EZXi3gY/jkle7fVCV6hOrfAkNukKaVhMgsMaUcaz\\nBCc60w6j6shIaZJr/Rv6U3fobIsknJ8xDbD2OnRLsNl84IKpMcZD/wO0/6JZnsD5\\nSzS8UZgfBcomvhjaewiL7f3e9mrL3FY/ubocnJEhGblQu4INnW/e29ELU5sGF5T2\\nCuUvEtr5W+wCJ1eu05FIsq0j4+mEIP84XF6DXUs4mdSeuh9dABAbgxGjI1FrWNhP\\n60LIBrDhZRQbgtBVUz/Oks3S4rya/KDwL2m2Kevp2/Mx\\n-----END CERTIFICATE-----\\n",\n' +
    '  "47ae49c4c9d3eb85a5254072c30d2e8e7661efe1": "-----BEGIN CERTIFICATE-----\\nMIIDHDCCAgSgAwIBAgIIAUH5Q2dTTIowDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\\nAwwmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjUw\\nNjMwMjAzNzE0WhcNMjUwNzE3MDg1MjE0WjAxMS8wLQYDVQQDDCZzZWN1cmV0b2tl\\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\\nggEPADCCAQoCggEBAN1KlYjppNJZX+hU/1o2Vtn3kg2Oxrw9ZMusT7fikH4Xj/Oi\\nD0M0HRLmBjfq+358rwlpg0rLtlODTAHI9LTT5zXPod67b5MKHQsLBpR05vQnpG3I\\niRzdp8vrsdJ/hWFyTGRveJi6OsBm/yYP8HBOax0pWsBzUMXIWj3sa+uoPHu8+5/A\\nT11qspXBrQFm8MyfgRn4/o2lOxV79tvaGg/LXFvFDMCmXL5Zp1zDDTt4fG6Jc/If\\nXqi9ZD2f8EYLsSxkbNLuqWIV9LDzKkyaQW2AGyAnf8cumjbe7BInzdJPOvmp7Mn6\\n1L8XE2AzfV4bphKvDdfPuKuYDD59lQ0t3zTVbBUCAwEAAaM4MDYwDAYDVR0TAQH/\\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\\nKoZIhvcNAQEFBQADggEBAEkOVh1gtP+rxKT0IA4gMl0ZiHbDConXX0gQdfQT0Y6j\\nflKTAV1p/EBfmogIpKR5lKa5km1uFyKr5sHR1xEL7g3x9BN8WwIg6UlfstxGba0E\\nlb3k16KY0UdWtyCd98PG6ifl/uKHbwp80xAASrCIDCrH6Sz8b3C/y6/0LZa0VCwa\\nqR6ZS7faSiDB28UK+xOu3KVDMn/xCUMkqN5l++/VcnJbkY+f0uAIooxzvAUxUht1\\nLOVa97hQO0xEvxg8/Fy8ss9Aw/2cvktCZI2PFhI6ssEVDymO+K6MBu1u2wOxSG13\\nf+aZlXdTOO4jG1OIg5tMK1Irxgpeljl44mqU29qDlCM=\\n-----END CERTIFICATE-----\\n"\n' +
    '}')

export function getPublicKeyByKid(kid) {
    return publicKeys[kid]
}

export async function verifyIdTokenLocally(token) {
    const decodedHeader = jwt.decode(token, { complete: true })

    if (!decodedHeader || !decodedHeader.header?.kid) {
        throw new Error('Invalid token header')
    }

    const key = getPublicKeyByKid(decodedHeader.header.kid)

    if (!key) {
        throw new Error('Public key not found for provided kid')
    }

    const config = useRuntimeConfig()

    return jwt.verify(token, key, {
        algorithms: ['RS256'],
        issuer: `https://securetoken.google.com/${config.project_id}`,
        audience: config.project_id,
    })
}
