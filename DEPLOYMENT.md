# SOC Security Dashboard - Deployment Guide

## Docker Deployment

### Prerequisites
- Docker Engine 20.10 or higher
- Docker Compose 2.0 or higher
- At least 2GB of available RAM
- 10GB of available disk space

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd app-7xqkk8c04h6p
   ```

2. **Build and start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the dashboard**
   Open your browser and navigate to:
   ```
   http://localhost
   ```

### Docker Commands

#### Build the image
```bash
docker-compose build
```

#### Start the services
```bash
docker-compose up -d
```

#### Stop the services
```bash
docker-compose down
```

#### View logs
```bash
docker-compose logs -f
```

#### Restart the services
```bash
docker-compose restart
```

#### Update the application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d
```

### Configuration

#### Port Configuration
By default, the application runs on port 80. To change the port, edit `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Change 8080 to your desired port
```

#### Environment Variables
Create a `.env` file in the root directory to configure environment variables:

```env
NODE_ENV=production
```

### Health Checks

The application includes built-in health checks. Check the status:

```bash
docker-compose ps
```

A healthy service will show `(healthy)` in the status column.

### Troubleshooting

#### Container won't start
```bash
# Check logs
docker-compose logs soc-dashboard

# Check container status
docker ps -a
```

#### Port already in use
```bash
# Find process using port 80
sudo lsof -i :80

# Or change the port in docker-compose.yml
```

#### Permission issues
```bash
# Run with sudo if needed
sudo docker-compose up -d
```

### Production Deployment

For production environments:

1. **Use a reverse proxy** (nginx, traefik) for SSL/TLS termination
2. **Configure firewall rules** to restrict access
3. **Set up monitoring** and alerting
4. **Regular backups** of configuration and data
5. **Update regularly** to get security patches

### Security Considerations

- Change default ports in production
- Use HTTPS with valid SSL certificates
- Implement proper authentication and authorization
- Regular security audits and updates
- Monitor logs for suspicious activity
- Restrict network access to trusted IPs

### Scaling

To run multiple instances:

```bash
docker-compose up -d --scale soc-dashboard=3
```

Note: You'll need to configure a load balancer for multiple instances.

### Monitoring

Monitor container resources:

```bash
docker stats soc-dashboard
```

### Backup and Restore

#### Backup
```bash
# Backup volumes
docker run --rm -v soc-data:/data -v $(pwd):/backup alpine tar czf /backup/soc-backup.tar.gz /data
```

#### Restore
```bash
# Restore volumes
docker run --rm -v soc-data:/data -v $(pwd):/backup alpine tar xzf /backup/soc-backup.tar.gz -C /
```

## Support

For issues and questions:
- Check the logs: `docker-compose logs -f`
- Review this documentation
- Check Docker and Docker Compose versions
- Ensure system requirements are met
