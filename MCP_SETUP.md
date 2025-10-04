# Avolve MCP Server Configuration

## Available MCP Servers

### Supabase (Avolve Database)
- **Server Name**: `supabase-avolve`
- **Project ID**: `zrdkuqagtbgexphjykpy`
- **Project URL**: `https://zrdkuqagtbgexphjykpy.supabase.co`
- **Local URL**: `http://127.0.0.1:54321` (when running locally)
- **Status**: ✅ Connected
- **Capabilities**: Full database access, auth, storage, real-time subscriptions

### Local Development Setup
- **Local Supabase**: Running on port 54321
- **Studio URL**: `http://127.0.0.1:54323`
- **API URL**: `http://127.0.0.1:54321`
- **DB URL**: `postgresql://postgres:postgres@127.0.0.1:54322/postgres`

### Zapier (Automation & Integrations)
- **Server Name**: `zapier`
- **Endpoint**: `https://mcp.zapier.com/api/mcp/mcp`
- **Status**: ✅ Connected (Global)
- **Capabilities**: Access to 8,000+ apps for automation
- **Type**: HTTP with Bearer authentication

### Global MCP Servers (Inherited)
- **GitHub**: Repository management, PRs, issues
- **Filesystem**: File operations across `/Users/avolve`
- **shadcn-ui**: UI component library
- **Magic UI**: Advanced UI components
- **Expo**: React Native development
- **Playwright**: Browser automation & testing
- **Context7**: Documentation lookup

## Quick Commands

### Check MCP Status
```bash
cd ~/dev/active/avolve
claude mcp list
```

### Supabase CLI Commands
```bash
# Start local Supabase
supabase start

# Check status
supabase status

# Stop local Supabase
supabase stop

# Pull remote schema
supabase db pull

# Push local migrations
supabase db push

# Open Supabase Studio
supabase studio
```

### Local Development
```bash
# Start local Supabase stack
supabase start

# The MCP server will automatically connect to:
# - Local: http://127.0.0.1:54321 (when Supabase is running locally)
# - Remote: https://zrdkuqagtbgexphjykpy.supabase.co (when not running locally)
```

## Access Credentials

All credentials are securely stored in:
- `~/.claude.json` (permissions: 600)
- Environment variables for local development

**Avolve Supabase Project**
- Project Reference: `zrdkuqagtbgexphjykpy`
- URL: `https://zrdkuqagtbgexphjykpy.supabase.co`
- Publishable Key: `sb_publishable_l_fI9_mznioAH5WlF2fHMg_c_1D6nRw`
- Secret Key: Stored in MCP config as `SUPABASE_ACCESS_TOKEN`

## Project Structure

```
~/dev/active/avolve/
├── MCP_SETUP.md          # This file
├── .env.local            # Local environment variables
└── supabase/             # Supabase configuration (if exists)
    ├── config.toml
    └── migrations/
```

## Security Notes

✅ **Implemented Best Practices:**
- Config files secured with 600 permissions (owner-only read/write)
- HTTPS endpoints for all remote connections
- Proper Supabase CLI linking to production project
- Local development uses isolated Supabase instance

⚠️ **Security Considerations:**
- MCP servers have full database access via service role key
- Local Supabase uses default credentials (fine for development)
- Zapier MCP can access all configured Zapier actions

## Troubleshooting

### MCP Server Won't Connect
```bash
# Re-add the server
cd ~/dev/active/avolve
claude mcp remove supabase-avolve
claude mcp add supabase-avolve npx @supabase/mcp-server-supabase@latest -e SUPABASE_ACCESS_TOKEN=<your_secret_key>
```

### Supabase CLI Issues
```bash
# Re-link project
supabase link --project-ref zrdkuqagtbgexphjykpy
```

### Local Supabase Not Running
```bash
# Start local instance
supabase start

# Check what's running
supabase status
```

### Permission Denied Errors
```bash
# Ensure config files have correct permissions
chmod 600 ~/.claude.json
```

## Development Workflow

1. **Start Local Supabase**
   ```bash
   cd ~/dev/active/avolve
   supabase start
   ```

2. **Verify MCP Connection**
   ```bash
   claude mcp list | grep supabase
   ```

3. **Develop with Local Database**
   - All MCP operations will use local Supabase
   - Studio available at http://127.0.0.1:54323

4. **Push to Production**
   ```bash
   supabase db push
   ```

---
**Last Updated**: October 2, 2025
**Maintained by**: Claude Code
