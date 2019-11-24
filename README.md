# chat-space

## groupsテーブル

Column|Type|Options|
|------|----|-------|
|name|references|null: false, foreign_key: true|


### Association
- belong_to :group
- belong_to :user 
- has_many :users, through: members
- has_many :members 

## userテーブル

Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false,|

### Association
- has_many :groups, through: members
- has_many :messages
- has_many :members

## membersテーブル

Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|boy|text|null: false,|
|image|string|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key:true|

### Association
- belongs_to :user
- belongs_to :group