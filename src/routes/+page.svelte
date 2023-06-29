<script lang="ts">
	import Datalist from '../lib/Datalist.svelte';
	import Divider from '../lib/Divider.svelte';
	import InputGroup from '../lib/InputGroup.svelte';

	let days: number;
	let months: number;
	let years: number;

	const handleInputChange = (event: any) => {
		console.log(event.detail.name, event.detail.value);
		switch (event.detail.name) {
			case 'day':
				days = event.detail.value;
				break;
			case 'month':
				months = event.detail.value;
				break;
			case 'year':
				years = event.detail.value;
				break;
			default:
				throw new Error('An unexpected error occurred.');
		}
	};
</script>

<div class="rounded-lg bg-white p-10 m-0 lg:w-[900px] md:w-[750px]">
	<div id="input" class="grid grid-flow-col gap-x-2">
		<InputGroup
			on:change={handleInputChange}
			name={'day'}
			type="number"
			min={0}
			max={32}
			placeholder="DD"
			list="days_list"
		/>
		<InputGroup
			on:change={handleInputChange}
			name={'month'}
			type="number"
			min={1}
			max={12}
			placeholder="MM"
			list="months_list"
		/>
		<InputGroup
			on:change={handleInputChange}
			name={'year'}
			type="number"
			min={1950}
			max={2100}
			placeholder="YYYY"
			list={null}
		/>
	</div>

	<Divider />

	<div class="grid grid-flow-row italic font-bold lg:text-7xl md:text-5xl text-3xl mt-7">
		<p>
			<span class="text-purple-600">{years || '--'}</span> years
		</p>
		<p>
			<span class="text-purple-600">{months || '--'}</span> months
		</p>
		<p>
			<span class="text-purple-600">{days || '--'}</span> days
		</p>
	</div>
</div>

<Datalist list="days" max={32} />
<Datalist list="months" max={12} />
