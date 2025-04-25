# File Organiser

A CLI tool to help you quickly sort your files into folders based on their extension, date created, size or type.

## Installation

```bash
npm install -g file-organiser
```

## Usage

```bash
file-organiser -s <source> -d <dest> -b <criteria>
```

### Options

- `-s, --source <dir>`: (required) folder you want to organise
- `-d, --dest <dir>`: where to put organised subfolders
- `-b, --by <criteria>`: grouping criterion (defaults to type)

### Criteria

- `extension`: organise files by their extension
- `date`: organise files by their creation date
- `size`: organise files by their size
- `type`: organise files by their type

## Example

```bash
file-organiser -s /path/to/source -d /path/to/dest -b extension
```
