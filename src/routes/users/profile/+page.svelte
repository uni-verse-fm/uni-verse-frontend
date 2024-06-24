<script lang="ts">
	import type { EventHandler } from 'svelte/elements';
	import BrokenImageIcon from '$lib/images/broken-image.svg';
	import MinioConf from '$lib/minio/conf.js';
	import GenericFormField from '$lib/components/generic-form-field.svelte';

	export let data;

	const handleBrokenImageLink: EventHandler = (e) => {
		const img = e.target as HTMLImageElement;
		img.style.display = 'none';
		img.src = BrokenImageIcon;
	};
</script>

<div class="card">
	<div class="pp">
		<img src={BrokenImageIcon} alt="User pp placeholder" />
		<img
			src={`${MinioConf.baseUrl}/images/${data.user.profilePicture}`}
			alt="User pp"
			on:error={handleBrokenImageLink}
		/>
	</div>
	<div class="user-infos">
		<h1>{data.user.username}</h1>
	</div>
	<div class="forms">
		<form
			class="profile-form"
			method="post"
			action="?/profilePicture"
			enctype="multipart/form-data"
		>
			<label>
				<span>Profile picture</span>
				<input name="profilePicture" type="file" required />
			</label>
			<button>Upload an image picture</button>
		</form>

		<form>
			<button>Password change</button>
		</form>
		<form>
			<button>Stripe onboard</button>
		</form>
	</div>
</div>

<style>
	.card {
		background-color: var(--overlay);
		border-radius: var(--rounding);
		padding: 3em;
		width: 60em;
		margin: auto;
		display: grid;
		grid-template-areas:
			'pp infos '
			'controls controls';
		grid-template-columns: 10vw auto;
		grid-template-rows: 10 10vw;
		gap: 1em;
	}

	.user-infos {
		grid-area: infos;
	}

	.pp {
		width: 100%;
		height: 100%;
		object-fit: pp;
		border-radius: var(--rounding);
		overflow: hidden;
		grid-area: pp;
		place-self: center;
		display: grid;
		aspect-ratio: 1;
	}

	.pp img {
		width: 80%;
		height: 80%;
		background-color: var(--highlight-low);
		border-radius: var(--rounding);
		object-fit: pp;
		grid-area: 1 / 1;
		place-self: center;
		color: var(--text);
	}

	.pp img * {
		color: var(--text);
	}

	.forms {
		display: flex;
		grid-area: controls;
		width: 100%;
		justify-content: space-around;
	}

	.profile-form {
		display: grid;
		grid-template-columns: 1fr;
	}

	.profile-form label {
		display: grid;
		grid-template-columns: 1fr;
	}
</style>
