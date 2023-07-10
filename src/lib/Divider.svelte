<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ArrowIcon from './ArrowIcon.svelte';

	const dispatch = createEventDispatcher();
	const handleClick = () => {
		dispatch('click', true);
	};
</script>

<div class="mt-16 grid h-0 md:mt-20">
	<hr class="relative h-px border-0 bg-neutral-200" />
	<ArrowIcon
		on:click={handleClick}
		class="relative -top-11 hover:bg-black md:-top-[4rem] lg:-top-[4.5rem] lg:mr-0"
	/>
</div>
