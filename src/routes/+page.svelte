<script lang="ts">
	import Datalist from '../lib/Datalist.svelte';
	import Divider from '../lib/Divider.svelte';
	import InputGroup from '../lib/InputGroup.svelte';

	let temp_age = {
		years: 0,
		months: 0,
		days: 0
	};
	let age: { years?: number; months?: number; days?: number } = {
		years: undefined,
		months: undefined,
		days: undefined
	};

	const handleInputChange = (event: any) => {
		switch (event.detail.name) {
			case 'day':
				temp_age.days = event.detail.value;
				break;
			case 'month':
				temp_age.months = event.detail.value;
				break;
			case 'year':
				temp_age.years = event.detail.value;
				break;
			default:
				throw new Error('An unexpected error occurred.');
		}
		if (temp_age.years && temp_age.months && temp_age.days) {
			age = { ...processAge(temp_age) };
		}
	};

	const processAge = (tmp_age: { years: number; months: number; days: number }) => {
		let today = new Date();
		let birthDate = new Date(tmp_age.years, tmp_age.months, tmp_age.days);
		let age = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
			m += 12;
		}
		let d = today.getDate() - birthDate.getDate();
		if (d < 0) {
			m--;
			d += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
		}
		return { years: age, months: m, days: d };
	};

	const pipeAge = (num?: number) => {
		return num ?? '--';
	};
</script>

<div class="rounded-lg bg-white p-10 m-0 lg:w-[900px] md:w-[750px]">
	<div id="input" class="container grid grid-flow-col gap-x-2">
		<InputGroup
			on:change={handleInputChange}
			name={'day'}
			type="number"
			min={1}
			max={32}
			placeholder="DD"
			list="days_list"
			required={true}
		/>
		<InputGroup
			on:change={handleInputChange}
			name={'month'}
			type="number"
			min={1}
			max={12}
			placeholder="MM"
			list="months_list"
			required={true}
		/>
		<InputGroup
			on:change={handleInputChange}
			name={'year'}
			type="number"
			min={1950}
			max={2100}
			placeholder="YYYY"
			list={null}
			required={true}
		/>
	</div>

	<Divider />

	<div class="container grid grid-flow-row italic font-bold lg:text-7xl md:text-5xl text-3xl mt-9">
		<p>
			<span class="text-purple-600">{pipeAge(age.years)}</span> years
		</p>
		<p>
			<span class="text-purple-600">{pipeAge(age.months)}</span> months
		</p>
		<p>
			<span class="text-purple-600">{pipeAge(age.days)}</span> days
		</p>
	</div>
</div>

<Datalist list="days" max={32} />
<Datalist list="months" max={12} />
