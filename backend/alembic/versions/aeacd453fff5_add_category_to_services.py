"""add category to services

Revision ID: aeacd453fff5
Revises: f8a391289bed
Create Date: 2026-06-23 12:22:00.129706

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'aeacd453fff5'
down_revision: Union[str, Sequence[str], None] = 'f8a391289bed'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add with a server_default so existing rows get backfilled instead of erroring on NOT NULL
    op.add_column('services', sa.Column('category', sa.String(), nullable=False, server_default='General'))
    # Drop the server_default afterward so future inserts must explicitly set category
    op.alter_column('services', 'category', server_default=None)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('services', 'category')
