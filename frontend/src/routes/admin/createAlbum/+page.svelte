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

  // Album types must match the Record enum in schema.prisma exactly: EP, Single, Album
  const ALBUM_TYPES = ["EP", "Single", "Album"];

  let { data, form } = $props();
  // getAlbums on the backend actually returns { message: albums } on
  // success (an array under the `message` key, not `data`), and
  // { message: "No albums found" } as a string on the empty/404 case.
  // So `albums` is an array only when Array.isArray(...) is true;
  // otherwise treat it as the empty-state text.
  let rawAlbums = data.albums?.message;
  let albums = Array.isArray(rawAlbums) ? rawAlbums : [];
  let emptyMessage = Array.isArray(rawAlbums) ? null : rawAlbums;
  // If your getArtists controller has the same { message: artists } shape
  // as getAlbums, swap the line below for:
  //   let artists = Array.isArray(data.artists?.data) ? data.artists.data
  //               : Array.isArray(data.artists?.message) ? data.artists.message
  //               : [];
  let artists = data.artists?.data ?? [];
  let errors = form?.errors;
  let error = data.error;
  let tokenError = form?.error;

  let editingId = $state(null);
  let editName = $state("");
  let editGenre = $state("");
  let editReleaseDate = $state("");
  let editAlbumType = $state(ALBUM_TYPES[0]);
  let editArtistId = $state("");
</script>

<Container class="mt-4">
  <h1 class="mb-4">Create Album</h1>

  <Card class="mb-4">
    <CardHeader>Create Album</CardHeader>
    <CardBody>
      <form method="POST" action="?/create">
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

        <FormGroup>
          <label for="albumType">Album Type</label>
          <Input id="albumType" name="albumType" type="select" value={form?.albumType ?? ALBUM_TYPES[0]}>
            {#each ALBUM_TYPES as type}
              <option value={type}>{type}</option>
            {/each}
          </Input>
        </FormGroup>

        <FormGroup>
          <label for="artistId">Artist</label>
          <Input id="artistId" name="artistId" type="select" value={form?.artistId ?? ''}>
            <option value="" disabled>Select an artist</option>
            {#each artists as artist}
              <option value={artist.id}>{artist.name}</option>
            {/each}
          </Input>
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
          <th>Genre</th>
          <th>Release Date</th>
          <th>Album Type</th>
          <th>Artist</th>
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
                <Input type="text" bind:value={editGenre} />
              </td>
              <td>
                <Input type="text" bind:value={editReleaseDate} />
              </td>
              <td>
                <Input type="select" bind:value={editAlbumType}>
                  {#each ALBUM_TYPES as type}
                    <option value={type}>{type}</option>
                  {/each}
                </Input>
              </td>
              <td>
                <Input type="select" bind:value={editArtistId}>
                  {#each artists as artist}
                    <option value={artist.id}>{artist.name}</option>
                  {/each}
                </Input>
              </td>
              <td>
                <form method="POST" action="?/update" style="display: inline;">
                  <input type="hidden" name="id" value={album.id} />
                  <input type="hidden" name="name" value={editName} />
                  <input type="hidden" name="genre" value={editGenre} />
                  <input type="hidden" name="releaseDate" value={editReleaseDate} />
                  <input type="hidden" name="albumType" value={editAlbumType} />
                  <input type="hidden" name="artistId" value={editArtistId} />
                  <Button type="submit" color="success" size="sm" class="me-2">Save</Button>
                </form>
                <Button
                  color="secondary"
                  size="sm"
                  on:click={() => {
                    editingId = null;
                    editName = "";
                    editGenre = "";
                    editReleaseDate = "";
                    editAlbumType = ALBUM_TYPES[0];
                    editArtistId = "";
                  }}
                >
                  Cancel
                </Button>
              </td>
            </tr>
          {:else}
            <tr>
              <td>{album.name}</td>
              <td>{album.genre}</td>
              <td>{album.releaseDate}</td>
              <td>{album.albumType}</td>
              <td>{album.artist?.name ?? album.artistId}</td>
              <td>
                <Button
                  color="warning"
                  size="sm"
                  class="me-2"
                  on:click={() => {
                    editingId = album.id;
                    editName = album.name;
                    editGenre = album.genre;
                    editReleaseDate = album.releaseDate;
                    editAlbumType = album.albumType;
                    editArtistId = album.artistId;
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
  {:else if emptyMessage}
    <p class="text-muted">{emptyMessage}</p>
  {/if}
</Container>