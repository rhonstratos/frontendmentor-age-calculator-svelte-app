<script lang="ts">
	import moment from 'moment';
	import Datalist from '../lib/Datalist.svelte';
	import Divider from '../lib/Divider.svelte';
	import InputNumberGroup from '../lib/InputNumberGroup.svelte';
	import type { IAge, IValidatedAge } from '../types/age';

	let null_invalid = {
		days: false,
		months: false,
		years: false,
		all: false
	};
	let invalid = structuredClone(null_invalid);
	let null_age = { years: 0, months: 0, days: 0 };
	let temp_age = structuredClone(null_age);
	let age: IAge = {
		years: 0,
		months: 0,
		days: 0
	};
	let current_year = new Date().getFullYear();

	const handleButtonClick = () => {
		invalid = structuredClone(null_invalid);
		// validate inputs
		if (Object.values(temp_age).some((val) => val === 0)) return (invalid.all = true);
		else {
			if (!(temp_age.days >= 1 && temp_age.days <= 31)) {
				invalid.days = true;
				invalid.all = false;
			} else invalid.days = false;

			if (!(temp_age.months >= 1 && temp_age.months <= 12)) {
				invalid.months = true;
				invalid.all = false;
			} else invalid.months = false;

			if (!(temp_age.years >= 1950 && temp_age.years <= current_year)) {
				invalid.years = true;
				invalid.all = false;
			} else invalid.years = false;

			if (Object.values(invalid).some((val) => val)) return;
		}

		let processedAge = processAge(temp_age);

		if (processedAge.isValid) {
			delete processedAge.isValid;
			// validate age
			if (
				Object.values(processedAge).some((val: number, key) => val < 0) ||
				Object.values(processedAge).every((val) => val === 0)
			) {
				age = structuredClone(null_age);
				return (invalid.all = true);
			}

			age.days = processedAge.days;
			age.months = processedAge.months;
			age.years = processedAge.years;
		}
	};

	const processAge = (tmp_age: IAge): IValidatedAge => {
		const isValidDate = (dateString: string) => {
			let date = new Date(dateString);
			return date instanceof Date && !isNaN(Number(date));
		};
		const dateToLocaleString = (date: number) =>
			date.toLocaleString('en-US', {
				minimumIntegerDigits: 2,
				useGrouping: false
			});
		const dateString = `${tmp_age.years}-${dateToLocaleString(tmp_age.months)}-${dateToLocaleString(
			tmp_age.days
		)}`;

		if (!isValidDate(dateString)) {
			invalid.all = true;
			return { isValid: false, ...null_age };
		}

		let date = new Date(dateString);
		let totalMonths = moment().diff(date, 'months');
		let years = totalMonths / 12;
		years = parseInt(years as unknown as string);
		let months = totalMonths % 12;
		let days = moment().diff(moment(date).add(years, 'years').add(months, 'months'), 'days');

		return { isValid: true, years, months, days };
	};
</script>

<div class="m-0 rounded-lg bg-white p-10 md:w-[750px] lg:w-[900px]">
	<div class="container">
		<div id="input" class="flex gap-x-2">
			<InputNumberGroup
				invalid={invalid.days}
				invalidAll={invalid.all}
				bind:value={temp_age.days}
				name="day"
				min={1}
				max={31}
				placeholder="DD"
				list="days_list"
				required={true}
			/>
			<InputNumberGroup
				invalid={invalid.months}
				invalidAll={invalid.all}
				bind:value={temp_age.months}
				name="month"
				min={1}
				max={12}
				placeholder="MM"
				list="months_list"
				required={true}
			/>
			<InputNumberGroup
				invalid={invalid.years}
				invalidAll={invalid.all}
				bind:value={temp_age.years}
				name="year"
				min={1950}
				max={current_year}
				placeholder="YYYY"
				list={null}
				required={true}
			/>
		</div>
		<p class:hidden={!invalid.all} class="fixed italic text-red-600 first-letter:uppercase">
			Must be a valid date
		</p>
	</div>

	<Divider on:click={handleButtonClick} />

	<div class="container mt-9 grid grid-flow-row text-3xl font-bold italic md:text-5xl lg:text-7xl">
		<p>
			<span class="text-purple-600">{age.years || '--'}</span> years
		</p>
		<p>
			<span class="text-purple-600">{age.months || '--'}</span> months
		</p>
		<p>
			<span class="text-purple-600">{age.days || '--'}</span> days
		</p>
	</div>
</div>

<Datalist list="days" max={32} />
<Datalist list="months" max={12} />
