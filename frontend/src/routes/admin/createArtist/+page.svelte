<script>
  import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    FormGroup,
    Input,
    Row,
    Table,
  } from '@sveltestrap/sveltestrap';
  import SuccessAlert from '$lib/components/alert.svelte';

  let { data, form } = $props();
  const artists = $derived(Array.isArray(data.artists) ? data.artists : data.artists?.data ?? []);
  const message = $derived(data.artists?.message);
  const errors = $derived(form?.errors);
  const error = $derived(data.error);
  const tokenError = $derived(form?.error);
  let editingId = $state(null);
  let editName = $state("");
  let editBirthYear = $state("");
  let editBio = $state("");

  let showSuccessAlert = $state(false);

  $effect(() => {
    if (form?.success) {
      showSuccessAlert = true;
    }
  });
</script>

<SuccessAlert
  bind:visible={showSuccessAlert}
  message={form?.message ?? "Successfully added"}
/>

<Container class="mt-4">
  <h1 class="mb-4">Create Artist</h1>

  <Card class="mb-4">
    <CardHeader>Create Artist</CardHeader>
    <CardBody>
      <form method="POST" action="?/create">
        <FormGroup>
          <label for="name">Name</label>
          <Input id="name" name="name" type="text" value={form?.name ?? ''} placeholder="Enter name" />
        </FormGroup>

        <FormGroup>
          <label for="birthYear">Birth Year</label>
          <Input id="birthYear" name="birthYear" type="number" value={form?.birthYear ?? ''} placeholder="Enter Year of Birth" />
        </FormGroup>

        <FormGroup>
          <label for="bio">Bio</label>
          <Input id="bio" name="bio" type="text" value={form?.bio ?? ''} placeholder="Enter a biography about the artist" />
        </FormGroup>

        <Button type="submit" color="primary">Submit</Button>
      </form>
    </CardBody>
  </Card>

  {#if form?.success === false}
    <Alert color="danger">{form.error}</Alert>
  {/if}

  {#if errors && errors.length > 0}
    <Alert color="warning">
      <ul class="mb-0">
        {#each errors as error}
          <li>{error.message}</li>
        {/each}
      </ul>
    </Alert>
  {/if}

  {#if error}
    <Alert color="danger">{error}</Alert>
  {/if}

  {#if tokenError}
    <Alert color="danger">{tokenError}</Alert>
  {/if}

  {#if errors && errors.length > 0}
    <Alert color="warning">
      <ul class="mb-0">
        {#each errors as error}
          <li>{error.message}</li>
        {/each}
      </ul>
    </Alert>
  {/if}

  {#if error}
    <Alert color="danger">{error}</Alert>
  {/if}

  {#if tokenError}
    <Alert color="danger">{tokenError}</Alert>
  {/if}

  {#if artists && artists.length > 0}
    <h2 class="mb-3">Artists</h2>
    <Table striped bordered>
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>BirthYear</th>
          <th>Bio</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each artists as artist}
          {#if editingId === artist.id}
            <tr>
              <td>
                <Input type="text" bind:value={editName} />
              </td>
              <td>
                <Input type="number" bind:value={editBirthYear} />
              </td>
              <td>
                <Input type="text" bind:value={editBio} />
              </td>
              <td>
                <form method="POST" action="?/update" style="display: inline;">
                  <input type="hidden" name="id" value={artist.id} />
                  <input type="hidden" name="name" value={editName} />
                  <input type="hidden" name="birthYear" value={editBirthYear} />
                  <input type="hidden" name="bio" value={editBio} />
                  <Button type="submit" color="success" size="sm" class="me-2">Save</Button>
                </form>
                <Button
                  color="secondary"
                  size="sm"
                  on:click={() => {
                    editingId = null;
                    editName = "";
                    editBirthYear = "";
                    editBio = "";
                  }}
                >
                  Cancel
                </Button>
              </td>
            </tr>
          {:else}
            <tr>
              <td>{artist.name}</td>
              <td>{artist.birthYear}</td>
              <td>{artist.bio}</td>
              <td>
                <Button
                  color="warning"
                  size="sm"
                  class="me-2"
                  on:click={() => {
                    editingId = artist.id;
                    editName = artist.name;
                    editBirthYear = artist.birthYear;
                    editBio = artist.bio;
                  }}
                >
                  Edit
                </Button>
                <form method="POST" action="?/delete" style="display: inline;">
                  <input type="hidden" name="id" value={artist.id} />
                  <Button type="submit" color="danger" size="sm">Delete</Button>
                </form>
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </Table>
  {:else if message}
    <p class="text-muted">{message}</p>
  {/if}
</Container>