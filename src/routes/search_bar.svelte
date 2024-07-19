<script>
	import apiConf from '$lib/api/conf';
	import 'iconify-icon';

	let query = '';
	let resourceType = 'users';

	let cooldown = false;

	let results = [];

	async function search(query, resourceType) {
		if (!query) {
			results = [];
		}

		await fetch(`${apiConf.baseUrl}/${resourceType}/search?search=${query}`)
			.then((res) => res.json())
			.then((res) => {
				results = res;
			});
	}

	function handleQuery(query, resourceType) {
		if (!cooldown) {
			search(query, resourceType);
			cooldown = true;

			setInterval(() => (cooldown = false), 3000);
		}
	}

	$: handleQuery(query, resourceType);
</script>

<form class="search-bar-form" on:submit={() => search(query, resourceType)}>
	<select class="search-bar-select" bind:value={resourceType}>
		<option value="users">User</option>
		<option value="resources">Resource</option>
		<option value="resources-packs">Resource Pack</option>
		<option value="playlists">Playlist</option>
		<option value="tracks">Track</option>
		<option value="releases">Release</option>
	</select>
	<div class="search-input-container">
		<input type="text" class="search-input" placeholder="Search" bind:value={query} />

		<div class="results">
			{#each results as result}
				<div class="result">
					{result.username}
				</div>
			{/each}
		</div>
	</div>

	<button type="submit" class="search-button">
		<iconify-icon icon="material-symbols:search" />
	</button>
</form>

<style>
	.search-bar-form {
		display: flex;
		flex-direction: row;
		padding: 0;
	}

	.search-input-container {
		margin: 0;
	}

	.search-input {
		margin: 0;
		border-radius: 0;
		outline: none;
		width: 30em;
		height: 100%;
	}

	.search-button {
		height: 100%;
		border-radius: 0 var(--rounding) var(--rounding) 0;
	}

	.search-bar-select {
		margin: 0;
		padding: 0 1em 0 1em;
		border-radius: var(--rounding) 0 0 var(--rounding);
	}

	.results {
		position: absolute;
		background-color: var(--surface);
		width: 30em;
		border-radius: var(--rounding);
		padding: 1em;
	}

	.result {
		background-color: var(--overlay);
    margin: 0.5em;

		padding: 0.5em;
	}
</style>
