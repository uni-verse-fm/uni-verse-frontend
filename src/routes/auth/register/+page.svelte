<script>
	export let form;

	let { email, username } = form ?? {};
	$: ({ email, username } = form ?? { email: '', username: '' });

</script>

<div class="register-card">
	<form method="POST">
		<label>
			<span>Username</span>
			<input name="username" type="username" value={username} required />
		</label>
		<label>
			<span>Email</span>
			<input name="email" type="email" value={email} required />
		</label>
		<label>
			<span>Password</span>
			<input name="password" type="password" value={form?.password ?? ''} required />
		</label>
		<label>
			<span>Confirm password</span>
			<input name="confirm-password" type="password" value={form?.confirmPassword ?? ''} required />
		</label>

		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}

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

	label {
		display: flex;
		justify-content: space-between;
		margin: 1em;
		vertical-align: middle;
	}

	button {
		margin-top: 1em;
	}

	.error {
		color: var(--error);
	}
</style>
