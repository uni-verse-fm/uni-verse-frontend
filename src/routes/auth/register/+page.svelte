<script>
	import GenericFormField from '$lib/components/generic-form-field.svelte';
	import { selectClassValidatorErrors } from '$lib/helpers';

	export let form;
</script>

<div class="register-card">
	<form method="POST">
		<GenericFormField
			field="username"
			value={form?.username?.toString()}
			errors={selectClassValidatorErrors('username', form?.error)}
			required
		/>
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
		<GenericFormField field="confirm-password" label="Confirm password" type="password" required />

		<button>Register</button>
	</form>
</div>

<style>
	.register-card {
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
