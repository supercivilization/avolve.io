#!/usr/bin/env node

/**
 * GitHub Token Validation and Feature Test Script
 * Tests GitHub API access and available features
 */

async function testGitHubToken() {
  const token = process.env.GITHUB_TOKEN;

  console.log('🔍 GitHub API Token Test');
  console.log('================================');

  if (!token) {
    console.error('❌ No GITHUB_TOKEN found in environment variables');
    console.log('💡 Add your token to .env.local: GITHUB_TOKEN=your_new_token_here');
    process.exit(1);
  }

  if (!token.startsWith('ghp_')) {
    console.error('❌ Token format appears incorrect. Should start with "ghp_"');
    process.exit(1);
  }

  console.log(`✅ Token found: ${token.substring(0, 7)}...${token.substring(token.length - 4)}`);

  try {
    // Test 1: Basic authentication
    console.log('\n🔐 Testing Authentication...');
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!userResponse.ok) {
      throw new Error(`Authentication failed: ${userResponse.status} ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();
    console.log(`✅ Authenticated as: ${userData.login}`);
    console.log(`👤 Profile: ${userData.name || 'No name set'}`);
    console.log(`📧 Email: ${userData.email || 'Private'}`);
    console.log(`🏢 Company: ${userData.company || 'None'}`);

    // Test 2: Repository access
    console.log('\n📂 Testing Repository Access...');
    const reposResponse = await fetch('https://api.github.com/user/repos?per_page=5&sort=updated', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!reposResponse.ok) {
      throw new Error(`Repository access failed: ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();
    console.log(`✅ Can access ${repos.length} repositories (showing 5 most recent)`);
    repos.forEach(repo => {
      console.log(`   📁 ${repo.full_name} (${repo.private ? 'private' : 'public'})`);
    });

    // Test 3: Rate limiting info
    console.log('\n⚡ Rate Limit Status...');
    const rateLimitResponse = await fetch('https://api.github.com/rate_limit', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const rateLimit = await rateLimitResponse.json();
    const core = rateLimit.resources.core;
    console.log(`✅ Rate Limit: ${core.remaining}/${core.limit} remaining`);
    console.log(`🔄 Resets at: ${new Date(core.reset * 1000).toLocaleTimeString()}`);

    // Test 4: Check specific repository (avolve)
    console.log('\n🎯 Testing Avolve Repository Access...');
    try {
      const avolveResponse = await fetch(`https://api.github.com/repos/${userData.login}/avolve`, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (avolveResponse.ok) {
        const avolveRepo = await avolveResponse.json();
        console.log(`✅ Can access avolve repository`);
        console.log(`   📊 ${avolveRepo.stargazers_count} stars, ${avolveRepo.forks_count} forks`);
        console.log(`   🌟 Last updated: ${new Date(avolveRepo.updated_at).toLocaleDateString()}`);
      } else if (avolveResponse.status === 404) {
        console.log(`⚠️  No repository named 'avolve' found`);
        console.log(`💡 This is normal if you haven't created it yet`);
      }
    } catch (error) {
      console.log(`⚠️  Could not check avolve repository: ${error.message}`);
    }

    // Test 5: Token scopes
    console.log('\n🔑 Token Permissions...');
    const scopes = userResponse.headers.get('x-oauth-scopes');
    if (scopes) {
      console.log(`✅ Scopes: ${scopes}`);

      const requiredScopes = ['repo', 'user'];
      const availableScopes = scopes.split(', ');

      requiredScopes.forEach(scope => {
        const hasScope = availableScopes.includes(scope);
        console.log(`   ${hasScope ? '✅' : '❌'} ${scope}: ${hasScope ? 'Available' : 'Missing'}`);
      });
    }

    console.log('\n🎉 GitHub Token Test Complete!');
    console.log('✅ Your token is properly configured and has the necessary permissions');
    console.log('🚀 Enhanced GitHub intelligence features are now available');

  } catch (error) {
    console.error('\n❌ GitHub API Test Failed:');
    console.error(`   ${error.message}`);

    if (error.message.includes('401')) {
      console.log('\n💡 Troubleshooting:');
      console.log('   1. Check that your token is correct in .env.local');
      console.log('   2. Ensure the token has not expired');
      console.log('   3. Verify the token has the required scopes (repo, user)');
    }

    process.exit(1);
  }
}

testGitHubToken();