<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// default w/h
	const dispatch = createEventDispatcher();
	let width = 46;
	let height = 42;
	let className = '';

	export { className as class, width, height };
</script>

<button
	on:click={() => dispatch('click', true)}
	class={className +
		' ' +
		'mx-auto mt-4 w-14 rounded-full bg-purple-600 p-4 md:w-24 md:p-7 lg:w-28 lg:p-8'}
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 44">
		<g fill="none" stroke="#FFF" stroke-width="2">
			<path
				d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"
			/>
		</g>
	</svg>
</button>
