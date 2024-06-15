<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import GenericFormField from '$lib/components/generic-form-field.svelte';

	export let title = '';
	export let file = '';

	export let index;

	export let errors: string[] = [];
</script>

<div transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}>
	<h2>Editing track NB {index}</h2>
	<GenericFormField field="tracks[][title]" label="Title" value={title} type="text" {errors} />

	<GenericFormField field="tracks[][file]" label="File" value={file} type="file" {errors} />
</div>
