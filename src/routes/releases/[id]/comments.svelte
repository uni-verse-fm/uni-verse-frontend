<script lang="ts">
	import ApiConf from '$lib/api/conf';
	import type { Comment } from '$lib/api/types';
	import LikeRadioButton from '$lib/components/like-radio-button.svelte';
	import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte';
	import BrokenProfilePicture from '$lib/images/profile.svg';
	import MinioConf from '$lib/minio/conf';
	import 'iconify-icon';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let trackId: string;

	export let loggedIn;

	async function getComments(track: string) {
		console.log('Fetching comments', track);
		return await fetch(`${ApiConf.baseUrl}/comments/track/${trackId}`).then((c) => c.json());
	}
</script>

<div transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }} class="comments">
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
	{#await getComments(trackId)}
		loading comments...
	{:then comments}
		{#each comments as comment}
			<div
				transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}
				class="comment"
			>
				<div class="avatar">
					<img class="placeholder" src={BrokenProfilePicture} alt="Avatar placeholder" />
					<img src={`${MinioConf.baseUrl}/images/${comment.owner?.profilePicture}`} alt="Avatar" />
				</div>
				<a class="username" href={`/users/${comment.owner._id}`}>{comment.owner.username}</a>
				<div class="positive">
					{#if comment.isPositive}
						<iconify-icon icon="material-symbols:thumb-up" />
					{:else}
						<iconify-icon icon="material-symbols:thumb-down" />
					{/if}
				</div>
				<div class="content">
					{comment.content}
				</div>
			</div>
		{/each}
	{:catch e}
		{e.message}
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

	.comment {
		background-color: var(--surface);
		margin-top: 1em;
		border-radius: var(--rounding);
		padding: 0.5em;
		display: grid;
		grid-template:
			'pp username pos'
			'content content content';
		grid-template-columns: 1fr 2fr 2fr;
		gap: 1em;
		padding: 1em;
	}

	.avatar {
		grid-area: pp;
		border-radius: 50%;
		aspect-ratio: 1;
		display: grid;

		height: 1em;
		overflow: hidden;
		font-size: 2em;

		border: 1px solid var(--accent);
		margin: 0.2em;
	}

	.avatar img {
		border-radius: 50%;
		overflow: hidden;
		text-indent: 100%;
		grid-area: 1/1;
		object-fit: cover;
		width: 1em;
	}

	.avatar .placeholder {
		font-size: 1.2em;
		margin-left: -0.08em;
		background-color: var(--surface);
	}

	.username {
		color: var(--text);
		vertical-align: middle;
		place-self: center;
		grid-area: username;
		text-decoration: none;
	}

	.username:hover {
		color: var(--accent);
		text-decoration: underline;
	}

	.positive {
		grid-area: pos;
		place-self: center end;
		font-size: 1.5em;
		color: var(--accent);
	}

	.content {
		grid-area: content;
		padding: 0 0.5em;
	}
</style>
