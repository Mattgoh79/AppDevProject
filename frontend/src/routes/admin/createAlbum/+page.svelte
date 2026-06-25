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
  let albums = data.albums.data;
  let message = data.albums.message;
  let errors = form?.errors;
  let error = data.error;
  let tokenError = form?.error;
  let editingId = $state(null);
  let editName = $state("");
  let editBirthYear = $state("");
  let editBio = $state("");
</script>

<Container class="mt-4">
  <h1 class="mb-4">Create Album</h1>

  <Card class="mb-4">
    <CardHeader>Create Album</CardHeader>
    <CardBody>
      <form method="POST" action="?/create">
      <!-- add a dropdown, it shows all current artist in the data base, choose one, that will be the artistId added in this request -->
        <FormGroup>
          <label for="name">Name</label>
          <Input id="name" name="name" type="text" value={form?.name ?? ''} placeholder="Enter name" />
        </FormGroup>
        <FormGroup>
          <label for="genre">Genre</label>
          <Input id="genre" name="genre" type="text" value={form?.genre ?? ''} placeholder="Enter the album genre" />
        </FormGroup>
        <FormGroup>
          <label for="releaseDate">Release Date</label>
          <Input id="releaseDate" name="releaseDate" type="text" value={form?.releaseDate ?? ''} placeholder="Enter Release Date" />
        </FormGroup>

        <!-- change it to drop down -->
        <FormGroup>
          <label for="albumType">Album Type</label>
          <Input id="albumType" name="albumType" type="text" value={form?.albumType ?? ''} placeholder="Enter Album Type" />
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

  {#if albums && albums.length > 0}
    <h2 class="mb-3">Albums</h2>
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
        {#each albums as album}
          {#if editingId === album.id}
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
                  <input type="hidden" name="id" value={album.id} />
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
              <td>{album.name}</td>
              <td>{album.birthYear}</td>
              <td>{album.bio}</td>
              <td>
                <Button
                  color="warning"
                  size="sm"
                  class="me-2"
                  on:click={() => {
                    editingId = album.id;
                    editName = album.name;
                    editBirthYear = album.birthYear;
                    editBio = album.bio;
                  }}
                >
                  Edit
                </Button>
                <form method="POST" action="?/delete" style="display: inline;">
                  <input type="hidden" name="id" value={album.id} />
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