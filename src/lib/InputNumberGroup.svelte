<script lang="ts">
	let value: number,
		name: string,
		min: number,
		max: number,
		placeholder: string,
		list: string | null,
		required: boolean = false,
		invalid: boolean = false;

	const validateInput = () => {
		const validity = value >= min && value <= max ? true : false;
		invalid = !validity;
		return validity;
	};

	export { value, name, min, max, placeholder, list, required, invalid };
</script>

<div class="form-group flex flex-grow flex-col">
	<label
		class:text-neutral-400={!invalid}
		class:text-red-600={invalid}
		class="text-xs font-semibold uppercase leading-loose tracking-widest"
		for={name}
	>
		{name}
	</label>

	<input
		bind:value
		on:change={() => validateInput()}
		class="rounded-md border p-2 font-bold {invalid
			? 'invalid:border-red-400 invalid:text-red-600 invalid:placeholder:text-red-400 focus:invalid:border-red-400 focus:invalid:ring-red-400'
			: 'border-neutral-200 placeholder-neutral-400'}"
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
		class:block={invalid}
		class:hidden={!invalid}
		class="mt-2 italic text-red-600 first-letter:uppercase"
	>
		must be a valid {name}
	</label>
</div>
