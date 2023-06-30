<script lang="ts">
	import Datalist from '../lib/Datalist.svelte';
	import Divider from '../lib/Divider.svelte';
	import InputGroup from '../lib/InputGroup.svelte';

	let invalidDate = false;

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
	};

	const dateIsValid = (date: Date) => {
		return date instanceof Date && !isNaN(Number(date));
	};
	const handleButtonClick = () => {
		const dateString = `${temp_age.years}-${temp_age.days}-${temp_age.months}`;
		const date = new Date(dateString);
		const log = dateIsValid(date) ? (age = { ...processAge(temp_age) }) : !(invalidDate = true);
		console.log(log);
	};

	const processAge = (tmp_age: { years: number; months: number; days: number }) => {
		let today = new Date();
		let birthDate = new Date(tmp_age.years, tmp_age.days, tmp_age.months);
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

<div class="m-0 rounded-lg bg-white p-10 md:w-[750px] lg:w-[900px]">
	<div class="container">
		<div id="input" class="flex gap-x-2">
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
		<p class:hidden={!invalidDate} class="fixed italic text-red-600 first-letter:uppercase">
			Must be a valid date
		</p>
	</div>

	<Divider on:click={handleButtonClick} />

	<div class="container mt-9 grid grid-flow-row text-3xl font-bold italic md:text-5xl lg:text-7xl">
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
