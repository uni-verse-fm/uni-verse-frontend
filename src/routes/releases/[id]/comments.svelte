<script>
	import ApiConf from '$lib/api/conf';
	import LikeRadioButton from '$lib/components/like-radio-button.svelte';
	export let trackId;

	let commentsFetch = fetch(`${ApiConf.baseUrl}/comments/track/${trackId}`).then((c) => c.json());
</script>

<div class="comments">
	<div class="leave-comment-label">Leave a comment :</div>

	<form method="post" action={`?/comment`} class="new-comment-form">
		<input type="hidden" name="trackId" value={trackId} />
		<textarea name="comment" required />
		<LikeRadioButton extraClasses="like-radio-button" />

		<button type="submit">
			<iconify-icon icon="material-symbols:send" />
		</button>
	</form>
	{#await commentsFetch}
		loading...
	{:then comments}
		{comments}
		<br />
		comments for track {trackId}
		<br />
		Yo this sucks man fuck you
		<br />
		Yo this is cool man
	{:catch e}
		Error fetching comments ({e.message})
	{/await}
</div>

<style>
	.leave-comment-label {
		margin: 1em 0;
	}

	.new-comment-form {
		display: grid;
		grid-template:
			'text text'
			'like send';
		grid-template-columns: 3fr 1fr;
		gap: 1em;
	}

	.new-comment-form textarea {
		grid-area: text;
		resize: vertical; 
	}

	.new-comment-form {
		grid-area: text;
	}

	.new-comment-form textarea {
		grid-area: text;
	}

	.comments {
		grid-area: comments;
	}
</style>
