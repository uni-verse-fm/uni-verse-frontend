<script>
	import GenericFormField from '$lib/components/generic-form-field.svelte';
	import { selectClassValidatorErrors } from '$lib/helpers';

	export let form;
</script>

<div class="login-card">
	<form method="POST">
		<GenericFormField
			field="email"
			value={form?.email?.toString()}
			errors={selectClassValidatorErrors('email', form?.error)}
			type="email"
			required
		/>
		<GenericFormField
			field="password"
			errors={selectClassValidatorErrors('password', form?.error)}
			type="password"
			required
		/>

		<button>Login</button>
	</form>
</div>

<style>
	.login-card {
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

	button {
		margin-top: 1em;
	}
</style>
