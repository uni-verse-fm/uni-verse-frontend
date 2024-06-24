<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/images/uni-verse-logo.svg';
	import CreateSelector from './create_selector.svelte';
	import { getContext } from 'svelte';
	import 'iconify-icon';
	import BrokenImageIcon from '$lib/images/broken-image.svg';
	import MinioConf from '$lib/minio/conf.js';
	import type { EventHandler } from 'svelte/elements';
	import type { Readable } from 'svelte/store';
	import type { SessionInfos } from '$lib/session';

	function handleLogin() {
		goto('/auth/login');
	}

	function handleRegister() {
		goto('/auth/register');
	}

	let session: Readable<SessionInfos> = getContext('session');

	const handleBrokenImageLink: EventHandler = (e) => {
		const img = e.target as HTMLImageElement;
		img.style.display = 'none';
		img.src = BrokenImageIcon;
	};
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
		{#if $session}
			<a class="username" href="/users/profile" title="My profile"> {$session.username} </a>

			<div class="pp">
				<img src={BrokenImageIcon} alt="User pp placeholder" />

				<img
					src={`${MinioConf.baseUrl}/images/${$session.profilePicture}`}
					alt="User pp"
					on:error={handleBrokenImageLink}
				/>
			</div>

			<CreateSelector />
			<form method="POST" action="/auth/logout">
				<button class="logoutButton">
					<iconify-icon icon="material-symbols:logout" />
				</button>
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

	.controlsSection > * {
		margin-right: 1em;
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

	.pp {
		border-radius: 50%;
		overflow: hidden;
		place-self: center;
		display: grid;
	}

	.pp img {
		aspect-ratio: 1;
		border-radius: 50%;
		overflow: hidden;
		object-fit: cover;
		grid-area: 1 / 1;
		place-self: center;
		font-size: 0;
		color: var(--text);
	}

	.pp img * {
		color: var(--text);
		border-radius: 50%;
		overflow: hidden;
	}

	.username {
		text-decoration: none;
		color: var(--text);
	}

	.username:hover {
		color: var(--accent);
		text-decoration: underline;
	}
</style>
