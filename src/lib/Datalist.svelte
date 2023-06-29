<script lang="ts">
	export let list: string, max: number;
</script>

<datalist id="{list}_list">
	{#each Array(max) as _, i}
		<option value={i + 1} />
	{/each}
</datalist>
