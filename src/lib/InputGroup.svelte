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

<div class="form-group flex flex-grow flex-col">
	<label
		class="peer-invalid:text-red-600 text-xs font-semibold uppercase leading-loose tracking-widest text-neutral-400"
		for={name}
	>
		{name}
	</label>
	<input
		on:change={onValueChange}
		class="peer invalid:text-red-600 invalid:placeholder:text-red-400 focus:invalid:ring-red-400 rounded-md border border-neutral-200 p-2 font-bold placeholder-neutral-400 invalid:border-red-400 focus:invalid:border-red-400"
		id={name}
		{name}
		{type}
		{min}
		{max}
		{placeholder}
		{list}
		{required}
	/>
	<label for="name" class="peer-invalid:block text-red-600 first-letter:uppercase italic mt-2 hidden">
		must be a valid {name}
	</label>
</div>
