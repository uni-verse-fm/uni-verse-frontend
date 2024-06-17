<script lang="ts">
	import GenericFormField from '$lib/components/generic-form-field.svelte';
	import { selectClassValidatorErrors } from '$lib/helpers';
	import 'iconify-icon';
	import TrackForm from './track_form.svelte';

	interface ReleaseFormData {
		error?: string;
		description?: string;
		cover?: Blob;
		title?: string;
		tracks: { title: string; file: Blob }[];
	}

	export let form: ReleaseFormData | null = {} as ReleaseFormData;

	let nbTracks = form?.tracks.length ?? 1;

	function handleTrackAdd(e: Event) {
		e.preventDefault();
		nbTracks += 1;
	}

	function handleTrackRemove(e: Event) {
		e.preventDefault();
		if (nbTracks > 1) {
			nbTracks -= 1;
		}
	}
</script>

<div class="form-card">
	<h1>Creating a release</h1>
	{#if form?.error}
		<p class="errors">
			{form.error}
		</p>
	{/if}
	<form method="POST" enctype="multipart/form-data">
		<GenericFormField
			field="title"
			value={form?.title?.toString()}
			errors={selectClassValidatorErrors('title', form?.error)}
			required
		/>

		<label>
			<span>Description</span>
			<textarea name="description">{form?.description?.toString() ?? ''}</textarea>
		</label>

		<label>
			<span>Cover</span>
			<input type="file" accept="image/png, image/jpeg" name="cover" />
		</label>

		<div class="nb-tracks-row">
			<span>Tracks in this release: {nbTracks}.</span>
			<span>
				<button on:click={handleTrackRemove}>
					<iconify-icon icon="material-symbols:remove" />
				</button>
				<button on:click={handleTrackAdd}>
					<iconify-icon icon="material-symbols:add" />
				</button>
			</span>
		</div>

		{#each Array(nbTracks) as _, i}
			<TrackForm index={i + 1} title={form?.tracks[i].title} />
		{/each}

		<button class="register-button">Register</button>
	</form>
</div>

<style>
	.form-card {
		background-color: var(--overlay);
		border-radius: var(--rounding);
		padding: 3em;
		width: 30em;
		margin: auto;
	}

	form {
		display: flex;
		flex-direction: column;
		margin: auto;
	}

	form span {
		margin: auto 0;
	}

	.register-button {
		margin-top: 1em;
	}

	.nb-tracks-row {
		display: flex;
		justify-content: space-between;
	}

	.nb-tracks-row span {
		margin-top: auto;
		margin-bottom: auto;
	}

	label {
		display: flex;
		justify-content: space-between;
		margin: 1em;
		vertical-align: middle;
	}

	.errors {
		color: var(--error);
	}
</style>
