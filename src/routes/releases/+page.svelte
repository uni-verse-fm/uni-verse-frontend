<script>
	import Release from '$lib/components/release.svelte';
	export let data;
</script>

<div class="card">
	<h1>Latest releases</h1>
	<div class="releases">
		{#each data.releases as release}
			<Release {release} />
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
	}

	.releases {
		display: grid;
		gap: 2em;
		width: 100%;
		grid-template-columns: repeat(3, 1fr);
	}
</style>
