"""empty message

Revision ID: 56be0b566039
Revises: 
Create Date: 2020-07-14 21:21:12.118848

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '56be0b566039'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('avatarURL', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('questions',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('optionOne', sa.String(), nullable=True),
    sa.Column('optionTwo', sa.String(), nullable=True),
    sa.Column('author', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['author'], ['users.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('answers',
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('question_id', sa.String(), nullable=False),
    sa.Column('answer', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('user_id', 'question_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('answers')
    op.drop_table('questions')
    op.drop_table('users')
    # ### end Alembic commands ###
