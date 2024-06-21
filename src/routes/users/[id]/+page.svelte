<script lang="ts">
	import BrokenImageIcon from '$lib/images/broken-image.svg';
	import MinioConf from '$lib/minio/conf.js';
	import type { EventHandler } from 'svelte/elements';
	import { getContext } from 'svelte';
	import type { SessionInfos } from '$lib/session';
	import type { Readable } from 'svelte/store';
	import Release from './release.svelte';

	export let data;

  $:console.log(data.releases)

	const handleBrokenImageLink: EventHandler = (e) => {
		const img = e.target as HTMLImageElement;
		img.style.display = 'none';
		img.src = BrokenImageIcon;
	};
</script>

<div class="card">
	<div class="pp">
		<img src={BrokenImageIcon} alt="User pp placeholder" />
		<img
			src={`${MinioConf.baseUrl}/images/${data.user}`}
			alt="User pp"
			on:error={handleBrokenImageLink}
		/>
	</div>
	<div class="user-infos">
		<h1>{data.user.username}</h1>
	</div>
	<div class="decription">Stats about this user are on their way!</div>
	<div class="releases">
    AAAAAAAA
		{#each data.releases as release}
			<Release />
			{release.title}
		{/each}
	</div>
</div>

<style>
	.card {
		background-color: var(--overlay);
		border-radius: var(--rounding);
		padding: 3em;
		width: 60em;
		margin: auto;
		display: grid;
		grid-template-areas:
			'pp infos '
			'pp desc '
			'releases releases ';
		grid-template-columns: 20vw auto;
		grid-template-rows: 10 10vw auto;
		gap: 1em;
	}

	.user-infos {
		grid-area: infos;
	}

	.pp {
		width: 100%;
		height: 100%;
		object-fit: pp;
		border-radius: var(--rounding);
		grid-area: pp;
		place-self: center;
		display: grid;
		aspect-ratio: 1;
	}

	.pp img {
		width: 80%;
		height: 80%;
		background-color: var(--highlight-low);
		border-radius: var(--rounding);
		object-fit: pp;
		grid-area: 1 / 1;
		place-self: center;
		color: var(--text);
	}

	.pp img * {
		color: var(--text);
	}

	.releases {
		grid-area: releases;
	}
</style>
