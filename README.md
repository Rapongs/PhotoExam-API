# API Spec

## Register User API

Endpoint : POST /api/user/register

Request Body :

```json
{
  "email": "example@mail.com",
  "password": "example123"
}
```

Response Body Success :

```json
{
  "message": "Pendaftaran Akun Berhasil",
  "data": {
    "uid": "example ID",
    "email": "example@email.com",
    "createdAt": "example-date"
  }
}
```

Response Body Error :

```json
{
  "error": [
    {
      "code": "500",
      "message": "Pendaftaran Akun Gagal"
    }
  ]
}
```

## Login User API

Endpoint : POST /api/user/login

Request Body :

```json
{
  "email": "example@mail.com",
  "password": "example123"
}
```

Response Body Success :

```json
{
  "message": "Berhasil Login",
  "data": {
    "token": "user-token"
  }
}
```

Response Body Error :

```json
{
  "error": [
    {
      "code": "401",
      "message": "Gagal login, Email atau Password salah"
    }
  ]
}
```

## Add Files API

Endpoint : POST /api/files

Header :

- Authorization: user-token

Request Body :

```json
{
  "documents": req.files
}
```

Response Body Success :

```json
{
  "message": "Berhasil upload",
  "data": [
    {
      "fileId": "file-id",
      "fileName": "file-name",
      "fileType": "file-type",
      "storageUrl": "file-url",
      "createdAt": "date"
    },
    {
      "fileId": "file-id",
      "fileName": "file-name",
      "fileType": "file-type",
      "storageUrl": "file-url",
      "createdAt": "date"
    }
  ]
}
```

Response Body Error :

```json
{
  "error": [
    {
      "code": "404",
      "message": "File tidak ditemukan"
    },
    {
      "code": "500",
      "message": "Terjadi kesalahan saat upload gambar"
    }
  ]
}
```

## Get All Files API

Endpoint : GET /api/files

Header :

- Authorization: user-token

Response Body Success :

```json
{
  "message": "Berhasil mendapatkan semua data",
  "data": [
    {
      "fileId": "file-id",
      "fileName": "file-name",
      "fileType": "file-type",
      "storageUrl": "file-url",
      "createdAt": "date"
    },
    {
      "fileId": "file-id",
      "fileName": "file-name",
      "fileType": "file-type",
      "storageUrl": "file-url",
      "createdAt": "date"
    }
  ]
}
```

Response Body Error :

```json
{
  "error": {
    "code": "500",
    "message": "Terjadi kesalahan saat mengambil file"
  }
}
```

## Get File by ID API

Endpoint : GET /api/files/:fileId

Header :

- Authorization: user-token

Response Body Success :

```json
{
  "message": "Berhasil mendapatkan satu data",
  "data": {
    "fileId": "file-id",
    "fileName": "file-name",
    "fileType": "file-type",
    "storageUrl": "file-url",
    "createdAt": "date"
  }
}
```

Response Body Error :

```json
{
  "error": [
    {
      "code": "404",
      "message": "File tidak ditemukan"
    },
    {
      "code": "500",
      "message": "Terjadi kesalahan saat mengambil file"
    }
  ]
}
```

## Delete File API

Endpoint : DELETE /api/files/:fileId

Header :

- Authorization: user-token

Response Body Success :

```json
{
  "message": "Berhasil menghapus satu data"
}
```

Response Body Error :

```json
{
  "error": [
    {
      "code": "404",
      "message": "File tidak ditemukan"
    },
    {
      "code": "500",
      "message": "Terjadi kesalahan saat menghapus file"
    }
  ]
}
```
