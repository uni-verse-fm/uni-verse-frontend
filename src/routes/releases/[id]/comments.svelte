<script lang="ts">
	import ApiConf from '$lib/api/conf';
	import type { Comment } from '$lib/api/types';
	import LikeRadioButton from '$lib/components/like-radio-button.svelte';
	import { onMount } from 'svelte';

	export let trackId;
	export let loggedIn;

	let comments: Comment[] = [];

	onMount(async () => {
		comments = await fetch(`${ApiConf.baseUrl}/comments/track/${trackId}`).then((c) => c.json());
	});
</script>

<div class="comments">
	{#if loggedIn}
		<div class="leave-comment-label">Leave a comment :</div>
		<form method="post" action={`?/comment`} class="new-comment-form">
			<input type="hidden" name="trackId" value={trackId} />
			<textarea name="comment" required />
			<LikeRadioButton extraClasses="like-radio-button" />

			<button type="submit">
				<iconify-icon icon="material-symbols:send" />
			</button>
		</form>
	{/if}
	{#each comments as comment}
		<div class="comment">
			<div class="comment-header">
				<img class="avatar" alt={`${comment.owner.username}'s profile picture`} />
				<div class="username">{comment.owner.username}</div>
				<div class="positive">
					{#if comment.isPositive}
						Good
					{:else}
						Bad
					{/if}
				</div>
			</div>
			<div class="content">
				{comment.content}
			</div>
		</div>
	{/each}
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

	.comment {
		background-color: var(--surface);
		margin-top: 1em;
		border-radius: var(--rounding);
		padding: 0.5em;
		display: grid;
		grid-template:
			'pp username pos'
			'content content content';
	}

	.avatar {
		grid-area: pp;
	}

	.username {
		grid-area: username;
	}

	.positive {
		grid-area: pos;
	}

	.content {
		grid-area: content;
	}
</style>
