<script lang="ts">
  import { Tabs, Tab, TabContent } from "carbon-components-svelte"
  import PageTitle from '$lib/PageTitle.svelte'
</script>

<PageTitle title="Installation &amp; setup"/>

<h2>Select your development framework</h2>

<Tabs>
  <Tab label="Vanilla JavaScript" />
  <Tab label="Svelte" />
  <Tab label="React" />
  <Tab label="Vue" />
  <Tab label="Angular" />
  <svelte:fragment slot="content">
    <TabContent>Vanilla JavaScript content</TabContent>
    <TabContent>Svelte content</TabContent>
    <TabContent>React content</TabContent>
    <TabContent>Vue content</TabContent>
    <TabContent>Angular content</TabContent>
  </svelte:fragment>
</Tabs>