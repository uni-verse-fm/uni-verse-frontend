<script lang="ts">
	export let field;
	export let label = field.charAt(0).toUpperCase() + field.slice(1);
	export let value: string | Blob = '';
	export let required = false;
	export let errors: Array<string> = [];
	export let type = 'text';
</script>

{#if errors.length > 0}
	<div class="errors">
		{#each errors as error}
			<p class="error">{error}</p>
		{/each}
	</div>
{/if}
<label>
	<span>{label}</span>
	<input name={field} {type} {value} {required} />
</label>

<style>
	.errors {
		color: var(--error);
		padding: 1em;
		border-radius: var(--rounding);
		background-color: var(--base);
	}

	label {
		display: flex;
		justify-content: space-between;
		margin: 1em;
		vertical-align: middle;
	}
</style>
