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

  let { data, form } = $props();
  let artists = data.artists.data;
  let message = data.artists.message;
  let errors = form?.errors;
  let error = data.error;
  let tokenError = form?.error;
</script>

<Container class="mt-4">
  <h1 class="mb-4">Dashboard</h1>

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

  {#if form?.success}
    <Alert color="success">{form.message}</Alert>
  {/if}

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
          <tr>
            <td>{artist.name}</td>
            <td>{artist.birthYear}</td>
            <td>{artist.bio}</td>
            <td>
              <form method="POST" action="?/delete">
                <input type="hidden" name="id" value={artist.id} />
                <Button type="submit" color="danger" size="sm">Delete</Button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </Table>
  {:else if message}
    <p class="text-muted">{message}</p>
  {/if}
</Container>