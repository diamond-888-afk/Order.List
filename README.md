OrderList (deployment notes)

This workspace contains a static HTML site (`ganesh.html`) and image folder. Below are instructions to run locally with Docker and how to deploy the site under the domain `orderlist.com`.

Quick local run (Docker):

1. Build and run with Docker:

```bash
# from d:/inex.html
docker build -t orderlist-site:latest .
docker run -p 8080:8080 --restart unless-stopped --name orderlist orderlist-site:latest
```

2. Open http://localhost:8080/ganesh.html to verify.

Or with docker-compose:

```bash
docker-compose up -d --build
```

Production deployment options (recommended):

- Static hosting/CDN: Upload site files to an object storage + CDN (Netlify, Vercel, Cloudflare Pages, or S3 + CloudFront). These are easiest and scale automatically.

- Container deploy: Use a cloud VM, DigitalOcean App Platform, AWS ECS/Fargate, or similar. Use the provided `Dockerfile` and `docker-compose.yml`.

Domain & TLS setup (example using a VM):

1. Provision a VM and point a DNS A record for `orderlist.com` to the VM public IP.
2. Run the container on the VM, listening on port 8080.
3. Put a reverse proxy (Caddy or nginx) on the host mapping 80/443 -> 8080. Caddy can get TLS automatically:

Caddyfile example:

```
orderlist.com {
    reverse_proxy localhost:8080
}
```

Caddy will obtain HTTPS certificates automatically.

Scaling to many users (100k concurrent): high-level steps

- Serve static assets from a CDN (Cloudflare, Fastly, AWS CloudFront). Avoid run-time work on every request.
- Keep server-side logic minimal and stateless; use a backend API only for orders.
- Use autoscaling groups / serverless (Cloud Run, App Engine, ECS Fargate) with load balancer.
- Add caching headers for static files and enable Brotli/Gzip compression.
- Add monitoring (Prometheus/Cloud provider monitoring) and load testing (k6, Gatling).

Notes about domain `orderlist.com`:

- I cannot register domains or set DNS from here. To use `orderlist.com` you must own that domain and create DNS A/ALIAS records pointing to your infrastructure.
- If you want, I can create the infrastructure-as-code (Terraform) templates and a minimal backend API next.

If you want me to continue, pick one:
- Create a minimal backend API to receive/save orders (Node + SQLite + Docker)
- Prepare Terraform for a cloud provider (DigitalOcean/AWS)
- Optimize images and produce a bundle ready for CDN

