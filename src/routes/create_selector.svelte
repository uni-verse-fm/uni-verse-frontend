<script>
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import 'iconify-icon';

	let showModal = false;

	function handleShowModal() {
		showModal = !showModal;
	}
</script>

<div class="container">
	<button class="modal-button" on:click={handleShowModal}>
		<iconify-icon icon="material-symbols:add" />
	</button>
	{#if showModal}
		<div
			class="create-menu"
			transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}
		>
			<button
				class="create-button"
				on:click={() => {
					showModal = false;
					goto('/releases/create');
				}}
			>
				Release
			</button>
			<button
				class="create-button"
				on:click={() => {
					showModal = false;
					goto('/resource-packs/create');
				}}
			>
				Resource pack
			</button>
			<button
				class="create-button"
				on:click={() => {
					showModal = false;
					goto('/playlists/create');
				}}
			>
				Playlist
			</button>
		</div>
	{/if}
</div>

<style>
	.container {
		position: relative;
		display: inline-block;
	}

	.modal-button {
		margin-left: 1em;
	}

	.create-menu {
		transition: ease-in 2s;

		margin-top: 0.5em;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: absolute;
		background-color: var(--overlay);
		border-radius: var(--rounding);
		width: max-content;
		padding: 0.5em 1em;
	}

	.create-button {
		text-decoration: none;
		display: block;
		width: 100%;
		margin: 0.5em 0;
	}
</style>
