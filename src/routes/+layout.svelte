<script>
	import '../global.css';
	import Header from './header.svelte';
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
