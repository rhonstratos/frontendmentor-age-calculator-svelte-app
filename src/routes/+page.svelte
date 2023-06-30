<script lang="ts">
	import Datalist from '../lib/Datalist.svelte';
	import Divider from '../lib/Divider.svelte';
	import InputNumberGroup from '../lib/InputNumberGroup.svelte';
	import moment from 'moment';

	let invalidDate = false;

	let age: { years?: number; months?: number; days?: number } = {
		years: undefined,
		months: undefined,
		days: undefined
	};

	let temp_age = { years: 0, months: 0, days: 0 };

	const isValidDate = (dateString: string) => {
		let date = new Date(dateString);
		return date instanceof Date && !isNaN(Number(date));
	};

	const handleButtonClick = () => {
		let processedAge = processAge(temp_age);
		if (processedAge.valid) {
			age.days = processedAge.days;
			age.months = processedAge.months;
			age.years = processedAge.years;
			invalidDate = age.years === 0 && age.months === 0 && age.days === 0;
		}
		if (invalidDate) {
			age = { years: undefined, months: undefined, days: undefined };
		}
	};

	const processAge = (tmp_age: { years: number; months: number; days: number }) => {
		const dateString = `${tmp_age.years}-${tmp_age.months.toLocaleString('en-US', {
			minimumIntegerDigits: 2,
			useGrouping: false
		})}-${tmp_age.days}`;
		if (!isValidDate(dateString)) {
			invalidDate = true;
			return { valid: false };
		}
		let date = new Date(dateString);
		let totalMonths = moment().diff(date, 'months');
		let years = totalMonths / 12;
		years = parseInt(years as unknown as string);
		let months = totalMonths % 12;
		let days = moment().diff(moment(date).add(years, 'years').add(months, 'months'), 'days');
		return {
			valid: true,
			years: years,
			months: months,
			days: days
		};
	};

	const pipeAge = (num?: number) => {
		return num ?? '--';
	};
</script>

<div class="m-0 rounded-lg bg-white p-10 md:w-[750px] lg:w-[900px]">
	<div class="container">
		<div id="input" class="flex gap-x-2">
			<InputNumberGroup
				{invalidDate}
				bind:value={temp_age.days}
				name={'day'}
				min={1}
				max={31}
				placeholder="DD"
				list="days_list"
				required={true}
			/>
			<InputNumberGroup
				{invalidDate}
				bind:value={temp_age.months}
				name={'month'}
				min={1}
				max={12}
				placeholder="MM"
				list="months_list"
				required={true}
			/>
			<InputNumberGroup
				{invalidDate}
				bind:value={temp_age.years}
				name={'year'}
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
