from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


class File(BaseModel):
    id: int
    name: str
    description: str | None = None

app = FastAPI()
db = []


@app.get("/files")
async def root():
    return db

@app.get("/files/{file_id}")
async def get_file(file_id: int):
    for existing_file in db:
        if existing_file["id"] == file_id:
            return {"file": existing_file}
    raise HTTPException(status_code=404, detail="No file detected")


@app.post("/files/add")
async def add_file(file: File):
    for existing_file in db:
        if file.id == existing_file['id']:
            raise HTTPException(status_code=400, detail="File ID is already taken")
    db.append(file.model_dump())
    return {"message": "File added successfully"}

@app.put("/files/change/{file_id}")
async def change_file(file: File):
    for existing_file in db:
        if existing_file["id"] == file.id:
            existing_file["name"] = file.name
            existing_file["description"] = file.description
            return {"message": "File updated successfully"}
    raise HTTPException(status_code=404, detail="No file detected")

@app.delete("/files/delete/{file_id}")
async def delete_file(file_id: int):
    for index, existing_file in enumerate(db):
        if existing_file["id"] == file_id:
            db.pop(index)
            return {"message": "File deleted successfully"}