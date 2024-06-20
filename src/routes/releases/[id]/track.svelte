<script>
	import 'iconify-icon';

	export let track;
	export let showTrackCallback;
	export let selected = false;
</script>

<div class="track-container">
	<button
		title="Play song"
		class="play-button"
		on:click={() => console.log(`Now playing ${track.title}`)}
	>
		<iconify-icon icon="material-symbols:play-circle-outline-rounded" />
	</button>
	<button
		title="Show song"
		class="track"
		class:selected
		on:click={() => showTrackCallback(track.id)}
	>
		<span>{track.title}</span>
	</button>
</div>

<style>
	.track-container {
		display: flex;
		flex-direction: row;
		border-radius: var(--rounding);
		background-color: var(--surface);
		margin-bottom: 0.5em;
		padding: 1.5em;
	}

	.track {
		padding: 0;
		background-color: var(--surface);
		width: 100%;
		vertical-align: middle;
		display: flex;
		flex-direction: row;
		font-size: 16px;
	}

	.track.selected {
		color: var(--accent);
	}

	.track:hover {
		color: var(--accent);
	}

	.play-button:hover {
		color: var(--accent);
	}

	.play-button {
		transition: var(--transition);
		color: var(--text);
		font-size: 25px;
		padding: 0;
		margin: 0;
		margin-right: 0.25em;
		background-color: rgba(0, 0, 0, 0);
	}

	.play-button:hover {
		color: var(--accent);
	}

	.play-button iconify-icon {
		font-size: 25px;
	}

	.track span {
		margin: auto 0;
	}
</style>
