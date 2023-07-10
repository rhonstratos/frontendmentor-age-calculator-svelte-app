<script lang="ts">
	let val: number,
		name: string,
		min: number,
		max: number,
		placeholder: string,
		list: string | null,
		required: boolean = false,
		invalid: boolean = false,
		invalidAll: boolean = false;

	export { val as value, name, min, max, placeholder, list, required, invalid, invalidAll };
</script>

<div class="form-group relative flex flex-grow flex-col">
	<label
		class:text-neutral-400={!invalid || !invalidAll}
		class:text-red-600={invalid || invalidAll}
		class="text-xs font-semibold uppercase leading-loose tracking-widest"
		for={name}
	>
		{name}
	</label>

	<input
		bind:value={val}
		class:border-neutral-200={!invalid || !invalidAll}
		class:placeholder-neutral-400={!invalid || !invalidAll}
		class:border-red-400={invalid || invalidAll}
		class:placeholder:text-red-400={invalid || invalidAll}
		class:focus:border-red-400={invalid || invalidAll}
		class:focus:ring-red-400={invalid || invalidAll}
		class="rounded-md border p-2 font-bold" 
		id={name}
		{name}
		type="number"
		{min}
		{max}
		{placeholder}
		{list}
		{required}
	/>

	<label
		for="name"
		class:hidden={!invalid}
		class="absolute -bottom-8 mt-2 whitespace-pre-line break-words text-xs italic leading-tight tracking-tighter text-red-600 first-letter:uppercase md:-bottom-5"
	>
		must be a valid {name}
	</label>
</div>
