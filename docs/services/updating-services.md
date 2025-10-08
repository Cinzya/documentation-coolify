# Updating Services

Updating services in Coolify requires careful planning and consideration. Unlike SaaS platforms where updates happen automatically, self-hosted services need manual intervention to ensure data integrity and compatibility.

## Before You Update

### 1. Read the Changelog

**Always check the service's official documentation and changelog before updating.** Services often introduce:

- Breaking changes requiring manual intervention
- New environment variables that must be added
- Database migrations that need to be run
- Deprecated features or changed configurations
- New service dependencies

### 2. Backup Your Data

Before any update:

- Create backups of your databases
- Export important configurations
- Take snapshots of persistent volumes
- Document your current working version

## Update Methods

### Method 1: Pull Latest Image (Simple Updates)

For services using the `latest` tag or when minor updates are released:

1. Navigate to your service in Coolify
2. Click on **Advanced** (dropdown next to Restart/Stop buttons)
3. Select **Pull Latest Images & Restart**

This method works when:

- The service uses semantic versioning
- No breaking changes are documented
- No database migrations are required

### Method 2: Update Version Tags (Recommended)

For better control over updates:

1. Click **Edit Compose File** in your service settings
2. Locate the image version tag (e.g., `image: service:1.0.0`)
3. Update to the desired version (e.g., `image: service:1.1.0`)
4. Save the changes
5. Click **Deploy** or use **Pull Latest Images & Restart**

**Example:**

```yaml
# Before
image: supabase/studio:20240923-2e3e90c

# After
image: supabase/studio:20241201-3f4g91d
```

## Common Update Scenarios

### Scenario: Manual Migration Required

Some services like [Appwrite](https://appwrite.io/docs/advanced/self-hosting/update) require adjustments or migrations of data (e.g., database schema changes, volume updates) via dedicated migration tool commands. Those commands could be run via a temporary migration service in your compose file:

```yaml
# Temporary migration service
services:
  migration:
    image: "service:new-version"
    command: "./app --upgrade --yes" # Check service docs for exact command
    depends_on:
      - database
```

1. Add the migration service to your compose file
2. Deploy to run the migration
3. Remove the migration service after completion
4. Update the main service image version

### Scenario: New Environment Variables

When updates require new configuration:

1. Check the service documentation for new required variables
2. Add them to your compose file:

```yaml
environment:
  - EXISTING_VAR=value
  - NEW_REQUIRED_VAR=new_value # Add new variables
```

3. Deploy the updated configuration

Read more about how Coolify handles environment variables in Docker Compose files [here](/knowledge-base/environment-variables).

### Scenario: Service Won't Start After Update

If a service becomes unhealthy after updating:

1. Check the container logs for error messages
2. Verify all required environment variables are set
3. Ensure database migrations have been run
4. Consider rolling back to the previous version
5. Consult the service's Discord/GitHub for known issues

## Best Practices

### 1. Update Strategy

- **Production**: Update during maintenance windows
- **Staging**: Test updates in a staging environment first
- **Development**: Keep development versions ahead of production

### 2. Version Pinning

Instead of using `latest`:

```yaml
# Avoid
image: service:latest

# Prefer
image: service:1.2.3
```

### 3. Update Frequency

- **Security updates**: Apply immediately
- **Feature updates**: Evaluate necessity
- **Major versions**: Plan and test thoroughly

### 4. Rollback Plan

Always have a rollback strategy:

1. Note the current working version
2. Keep backups before updating
3. Document the rollback procedure
4. Test rollback in non-production first

## Troubleshooting Common Issues

### "Pull Latest" Doesn't Update

- The image tag might be specific (e.g., `:1.0.0` instead of `:latest`)
- Docker cache might need clearing
- The service might already be on the latest version

### Database Connection Errors

- Environment variables might have changed
- Database migration might be incomplete
- Connection strings format might have changed

### Missing Features After Update

- Check if features were deprecated
- Verify all services in a multi-service stack updated
- Review configuration changes in changelog

### Service Keeps Restarting

- Check health check configuration
- Verify all dependencies are running
- Review logs for initialization errors

## Getting Help

If you encounter issues:

1. **Check the service's official documentation** for upgrade guides
2. **Search the service's GitHub issues** for similar problems
3. **Ask in the service's Discord/Forum** with:
   - Current version and target version
   - Error messages from logs
   - Your compose configuration (sanitized)
4. **Coolify Discord** for Coolify-specific update issues

## Update Checklist

Before updating any service:

- Read the service's changelog
- Check for breaking changes
- Backup databases and volumes
- Note current working version
- Plan rollback procedure
- Schedule maintenance window (if production)
- Test in staging environment (if available)
- Prepare migration scripts (if needed)
- Document new environment variables
- Update monitoring alerts

Remember: **When in doubt, don't update in production.** Test first, understand the changes, and always have a backup plan.
