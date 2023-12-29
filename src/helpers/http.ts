export const RemoveProcotol = (url: string) => {
    return url.replace('http://', '').replace('https://', '')
}

export const GetDomain = (subdomain: string, domain: string) => {
    domain = RemoveProcotol(domain)
    return `${subdomain}.${domain}`
}
