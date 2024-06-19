<script>
	import 'iconify-icon';

	export let fieldName = 'isPositive';

	export let extraClasses;
</script>

<div class={`container ${extraClasses}`}>
	<input type="radio" checked id="choice1" name={fieldName} value="true" required />
	<label for="choice1">
		<iconify-icon icon="material-symbols:thumb-up" />
	</label>

	<input type="radio" id="choice2" name={fieldName} value="false" required />
	<label for="choice2">
		<iconify-icon icon="material-symbols:thumb-down" />
	</label>
</div>

<style>
	input[type='radio'] {
		display: none;
	}

	.container {
		border-radius: var(--rounding);
		overflow: hidden;
		display: flex;
		border: solid 2px var(--accent);
	}

	label {
		transition: var(--transition);
		padding: 0.5em;
		cursor: pointer;
		height: 100%;
		width: 50%;
		text-align: center;
	}

	label iconify-icon {
		font-size: 20px;
	}

	input[type='radio']:checked + label {
		background-color: var(--accent);
	}
</style>
