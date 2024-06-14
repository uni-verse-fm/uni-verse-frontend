<script>
	import { goto } from '$app/navigation';
	import Icon from '$lib/images/uni-verse-logo.svg';
	import CreateSelector from './create_selector.svelte';
	import { getContext } from 'svelte';

	function handleLogin() {
		goto('/auth/login');
	}

	function handleRegister() {
		goto('/auth/register');
	}

	let session = getContext('session');
</script>

<header>
	<div class="branding">
		<img src={Icon} alt="Uni-verse logo" width={50} height={50} />
		<p>Uni-Verse</p>
	</div>
	<div class="">
		SearchBar here<!-- <SearchBar  /> -->
	</div>
	<div class="controlsSection">
		<CreateSelector />
		{#if $session}
			<span> {$session.username} </span>
			<form method="POST" action="/auth/logout">
				<button class="logoutButton">Logout</button>
			</form>
		{:else}
			<button class="loginButton" on:click={handleLogin}>Login</button>
			<button class="registerButton" on:click={handleRegister}>Register</button>
		{/if}
	</div>
</header>

<style>
	header {
		background-color: var(--surface);
		display: flex;
		flex-direction: row;
		top: 1em;
		left: 1em;
		right: 1em;
		justify-content: space-between;
		position: sticky;
		padding: 0.5em;

		border-radius: var(--rounding);
	}

	header * {
		margin-top: auto;
		margin-bottom: auto;
	}

	.controlsSection {
		display: flex;
		flex-direction: row;
	}

	.controlsSection * {
		margin: auto 1em;
	}

	.branding {
		display: flex;
		flex-direction: row;
	}

	.branding img {
		padding: 0 1em;
	}

	.branding p {
		font-size: 20px;
		font-weight: bold;
	}
</style>
