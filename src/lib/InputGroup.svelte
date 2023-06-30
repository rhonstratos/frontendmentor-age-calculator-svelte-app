<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let name: string,
		type: string,
		min: number,
		max: number,
		placeholder: string,
		list: string | null,
		required: boolean = false;
	const dispatch = createEventDispatcher();
	const onValueChange = (event: any) => {
		dispatch('change', { value: event.target.value, name: name });
	};

	export { name, type, min, max, placeholder, list, required };
</script>

<div class="form-group flex flex-col">
	<label
		class="font-semibold text-neutral-400 uppercase text-xs leading-loose tracking-widest"
		for={name}
	>
		{name}
	</label>
	<input
		on:change={onValueChange}
		class="rounded-md border p-2 font-bold border-neutral-200 placeholder-neutral-400"
		id={name}
		{name}
		{type}
		{min}
		{max}
		{placeholder}
		{list}
		{required}
	/>
</div>
