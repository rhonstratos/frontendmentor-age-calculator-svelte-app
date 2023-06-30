<script lang="ts">
	let value: number,
		name: string,
		min: number,
		max: number,
		placeholder: string,
		list: string | null,
		required: boolean = false,
		invalid: boolean = false,
		invalidDate: boolean = false;

	const validateInput = () => {
		const validity = value >= min && value <= max ? true : false;
		invalid = !validity;
		return validity;
	};

	export { value, name, min, max, placeholder, list, required, invalid, invalidDate };
</script>

<div class="form-group flex flex-grow flex-col relative">
	<label
		class:text-neutral-400={!invalidDate && !invalid}
		class:text-red-600={invalidDate || invalid}
		class="text-xs font-semibold uppercase leading-loose tracking-widest"
		for={name}
	>
		{name}
	</label>

	<input
		bind:value
		on:change={() => validateInput()}
		class:border-neutral-200={!invalid}
		class:placeholder-neutral-400={!invalid}
		class:border-red-400={invalidDate || invalid}
		class:placeholder:text-red-400={invalidDate || invalid}
		class:focus:border-red-400={invalidDate || invalid}
		class:focus:ring-red-400={invalidDate || invalid}
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

	<label for="name" class:hidden={!invalid} class="absolute -bottom-6 mt-2 italic text-red-600 first-letter:uppercase">
		must be a valid {name}
	</label>
</div>
