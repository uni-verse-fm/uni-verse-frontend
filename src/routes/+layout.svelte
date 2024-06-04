<script>
	import { writable } from 'svelte/store';
	import '../global.css';
	import Header from './header.svelte';
	import { setContext } from 'svelte';

	export let data;

	const session = writable();
	$: session.set(data.session);

	setContext('session', session);
</script>

<Header />
<div class="container">
	<slot />
</div>

<style>
	.container {
		border-radius: var(--rounding);
		background-color: var(--surface);
		margin: 1em 0;
		padding: 5vw;
	}
</style>
