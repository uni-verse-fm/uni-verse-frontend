<script lang="ts">
	import MinioConf from '$lib/minio/conf';
	import 'iconify-icon';
	import type { EventHandler } from 'svelte/elements';
	import Icon from '$lib/images/broken-image.svg';

	export let release;

	const handleBrokenImageLink: EventHandler = (e) => {
		const img = e.target as HTMLImageElement;
		img.style.display = 'none';
		img.src = Icon;
	};
</script>

<div class="release">
	<div class="cover">
		<img src={Icon} alt="Release cover placeholder" />
		<img
			src={`${MinioConf.baseUrl}/images/${release.coverName}`}
			alt="Release cover"
			on:error={handleBrokenImageLink}
		/>
		<button
			class="play-button"
			on:click={() => {
				console.log(`Now playing ${release.title}!`);
			}}
			title="Play release"
		>
			<iconify-icon icon="material-symbols:play-circle-outline-rounded" />
		</button>
	</div>

	<a class="title" title="See Release" href={`/releases/${release._id}`}>{release.title}</a>
	<a class="author" title="See Artist" href={`/users/${release.author._id}`}>
		{release.author.username}
	</a>
</div>

<style>
	.release {
		display: grid;
		grid-template-columns: 1fr;
		background-color: var(--base);
		border-radius: var(--rounding);
		padding: 1.5em;
	}

	.cover {
		width: 15vw;
		height: 15vw;
		margin: 0.5em;
		object-fit: cover;
		border-radius: var(--rounding);
		place-self: center;
		display: grid;
		grid-template-columns: 1fr;
	}

	.cover img {
		background-color: var(--highlight-low);
		object-fit: cover;
		width: 15vw;
		height: 15vw;
		grid-area: 1 / 1;
		place-self: center;
		color: var(--text);
	}

	.cover img * {
		color: var(--text);
	}

	.cover .play-button {
		transition: all 0.5s ease-out;
		font-size: 13vw;
		grid-area: 1 / 1;
		place-self: center;
		background-color: transparent;
		color: transparent;
		padding: 0;
		margin: 0;
	}

	.cover:hover .play-button {
		color: var(--text);
		display: block;
		width: 100%;
		background-color: var(--base);
		opacity: 0.6;
	}

	.cover:hover img {
		/* Add the blur effect */
		filter: blur(8px);
		-webkit-filter: blur(8px);
	}

	.title:hover,
	.author:hover {
		text-decoration: underline;
		font-weight: bold;
	}

	.title,
	.author {
		color: inherit;
		text-decoration: none;
		place-self: center;
		margin: 0.5em;
	}

	.title {
		font-size: 18px;
	}

	.author {
		font-size: 16px;
	}
</style>
